# Bilibili Bangumi Downloader
forked from [proflylab](https://github.com/proflylab/bilibili)
### TO DO: 

- [ ] โฟลเดอร์ซับมีชื่อเรื่องที่ดาวนโหลด
- [ ] ดาวน์โหลด Video
- [ ] บันทึกการล็อกอิน ทำให้สามารถดาวนโหลดวิดีโอที่ความละเอียดมากกว่า 360p ได้
- [ ] แปลง bilibili JSON เป็น ASS
- [ ] merge MKV
- [ ] Bunch Download 
### ต้องการ
Deno

Shell (Mac, Linux):
```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```
PowerShell (Windows):
```powershell
iwr https://deno.land/x/install/install.ps1 -useb | iex
```
เมื่อติดตั้ง Deno แล้วต้องติดตั้ง denon ตามคำสั่งนี้
```sh
deno install -qAf --unstable https://deno.land/x/denon/denon.ts
```

```
Usage:
  $ bilibili <command> [options]

Commands:
  info <epId>  View epinfo
  sub <epId>   Get subtitle
  vid <epId>   Video Download (Soon)
  list         Lists of anime

For more info, run any command with the `--help` flag:
  $ bilibili info --help
  $ bilibili sub --help
  $ bilibili vid --help
  $ bilibili list --help

Options:
  -h, --help     Display this message
  -v, --version  Display version number
```

### บิวด์

```sh
deno compile --unstable ./src/app.ts
```
