<!-- @ajan: cursor · @etiket: kutuphane-zotero, fork, agpl -->
# Kutuphane — Zotero fork notları

Bu depo, resmi [zotero/zotero](https://github.com/zotero/zotero) kaynağının
**düzenlenebilir fork**’udur.

| | |
|--|--|
| **GitHub** | https://github.com/sanaatchi/kutuphane-zotero |
| **Upstream** | `https://github.com/zotero/zotero.git` (remote adı: `upstream`) |
| **Lisans** | AGPLv3 (upstream ile aynı) |
| **Yerel yol** | `Kutuphane/zotero-eklentiler/kutuphane-zotero/` |

## Ne değildir

- Resmi Zotero ürünü / sync desteği iddiası yok
- `referanslar/zotero-main` zip kopyası **değil** — o salt inceleme referansı
- `arsiv_app` bu fork’a gömülü değil; Arşiv uygulaması bağımsız kalır

## Yerel kurulum (özet)

Windows (Git Bash) için PATH’e ekleyin: MSYS2 (`C:/msys64/usr/bin` → zip/rsync/wget),
7-Zip, `app/xulrunner/bin` (rcedit).

```bash
git remote -v   # origin = sanaatchi/kutuphane-zotero, upstream = zotero/zotero
git lfs install && git lfs pull
npm i
app/scripts/fetch_rcedit
export PATH="/c/msys64/usr/bin:/c/Program Files/7-Zip:$(pwd)/app/xulrunner/bin:$PATH"
export NODE_OPTIONS=--openssl-legacy-provider
app/scripts/check_requirements   # dağıtım/NSIS/AWS FAIL olabilir — custom build için OK
app/scripts/build_and_run -r
```

**Windows notları (fork yamaları):** `js-build/reader.js` ve `note-editor.js`
içinde shell `mv …/*` yerine Node `fs.move` kullanılır (Git Bash glob kırılması).

**Ürün yolu:** Günlük kullanım ve eklenti geliştirme için stok/beta Zotero yeterlidir.
Bu fork chrome deneyi ve özel staging içindir; `arsiv_app` buraya gömülmez.

Belge: https://www.zotero.org/support/dev/client_coding/building_the_desktop_app

## Upstream senkron

```bash
git fetch upstream
git merge upstream/main   # veya rebase; çatışmalara dikkat
git push origin main
```

## Kutuphane ilişkisi

Ana Kutuphane reposunda `zotero-eklentiler/` gitignore’dadır.
Bu fork kendi GitHub reposunda yaşar; Arşiv (`arsiv_app`) ve üç Zotero eklentisi
ayrı kalır. Fork, chrome/UI deneyleri veya özel build içindir.
