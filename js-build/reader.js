'use strict';
// @ajan: cursor · @etiket: kutuphane-zotero, windows-build, reader

const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { getSignatures, writeSignatures, onSuccess, onError } = require('./utils');
const { buildsURL } = require('./config');

async function getReader(signatures) {
	const t1 = Date.now();

	const modulePath = path.join(__dirname, '..', 'reader');
	
	const { stdout } = await exec('git rev-parse HEAD', { cwd: modulePath });
	const hash = stdout.trim();
	
	if (!('reader' in signatures) || signatures['reader'].hash !== hash) {
		const targetDir = path.join(__dirname, '..', 'build', 'resource', 'reader');
		try {
			const filename = hash + '.zip';
			const tmpDir = path.join(__dirname, '..', 'tmp', 'builds', 'reader');
			const url = buildsURL + 'reader/' + filename;

			await fs.remove(targetDir);
			await fs.ensureDir(targetDir);
			await fs.ensureDir(tmpDir);

			// Use forward slashes in shell paths (Windows Git Bash / MSYS).
			const targetPosix = targetDir.replace(/\\/g, '/');
			const tmpPosix = tmpDir.replace(/\\/g, '/');
			await exec(
				`cd "${tmpPosix}"`
				+ ` && (test -f ${filename} || curl -f ${url} -o ${filename})`
				+ ` && unzip ${filename} zotero/* -d "${targetPosix}"`
			);
			// Node move — shell `mv .../*` breaks on Windows paths.
			const nested = path.join(targetDir, 'zotero');
			if (await fs.pathExists(nested)) {
				for (const name of await fs.readdir(nested)) {
					await fs.move(path.join(nested, name), path.join(targetDir, name), { overwrite: true });
				}
				await fs.remove(nested);
			}
		}
		catch (e) {
			if (!e.message?.includes('The requested URL returned error: 403')) {
				console.error(e);
			}
			await exec('npm ci', { cwd: modulePath });
			await exec('npm run build:zotero', { cwd: modulePath });
			if (!fs.pathExists(path.join(modulePath, 'build', 'zotero', 'pdf', 'build', 'pdf.mjs'))) {
				throw new Error('pdf.js build failed to produce output');
			}
			await fs.copy(path.join(modulePath, 'build', 'zotero'), targetDir);
		}
		signatures['reader'] = { hash };
	}
	
	const t2 = Date.now();

	return {
		action: 'reader',
		count: 1,
		totalCount: 1,
		processingTime: t2 - t1
	};
}

module.exports = getReader;

if (require.main === module) {
	(async () => {
		try {
			const signatures = await getSignatures();
			onSuccess(await getReader(signatures));
			await writeSignatures(signatures);
		}
		catch (err) {
			process.exitCode = 1;
			global.isError = true;
			onError(err);
		}
	})();
}
