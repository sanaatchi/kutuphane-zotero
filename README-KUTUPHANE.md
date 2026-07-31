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

```bash
# zaten clone edildiyse:
git remote -v   # origin = sanaatchi/kutuphane-zotero, upstream = zotero/zotero
git lfs install
git lfs pull
npm i
# Windows: Git Bash / WSL önerilir
app/scripts/check_requirements
app/scripts/build_and_run -r
```

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
