import { cac } from "../deps.ts";
import { emptyDir } from "https://deno.land/std@0.103.0/fs/mod.ts";
import { exec } from "https://deno.land/x/exec/mod.ts";
//import { bbJsonToSrt } from "./utils/index.ts";

const cli = cac("bilibili");

cli
  .command("info <epId>", "View epinfo")
  .action(async (epId) => {
    await fetch(
      `https://api.global.bilibili.com/intl/gateway/web/view?oid=${epId}&tp=3&s_locale=th_TH`,
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
      });
  });

cli
  .command("sub <epId>", "Get subtitle")
  .action(async (epId, options) => {
    const res = await fetch(
      `https://api.biliintl.com/intl/gateway/m/subtitle?build=1&ep_id=${epId}&s_locale=th_TH`,
    );
    emptyDir(`./${epId}`);
    const { data: { subtitles } } = await res.json();

    // deno-lint-ignore require-await
    subtitles.map(async (item: any) => {
      const { key, url } = item;
      const dest = `[${key}] ${url}`;
      exec(`curl -o "./${epId}/${key}.json" ${url}`)
        .catch((err) => {
          console.error(err);
        });
      console.log(dest);
    });
  });

cli
  .command("vid <epId>", "Video Download (Soon)")
  .action(async (epId, options) => {
    const res = await fetch(
      `https://api.biliintl.com/intl/gateway/web/playurl?&device=wap&ep_id=${epId}&platform=web&qn=112&s_locale=th_TH`,
    );
    const { data: { playurl } } = await res.json();
    console.log(playurl);
  });

cli
  .command("list", "Lists of anime")
  .action(async () => {
    const res = await fetch(
      "https://api.biliintl.com/intl/gateway/v2/ogv/season/index/result?&build=1000210&c_locale=&mobi_app=bstar_a&order=0&page=1&pagesize=1&platform=web&s_locale=th_TH",
    );
    const { data: { total } } = await res.json();
    const round = Math.ceil(total / 100);

    for (let page = 0; page < round; page++) {
      const res = await fetch(
        `https://api.biliintl.com/intl/gateway/v2/ogv/season/index/result?&build=1000210&c_locale=&mobi_app=bstar_a&order=0&page=${page}&pagesize=100&platform=web&s_locale=th_TH`,
      );
      const { data: { list } } = await res.json();

      // deno-lint-ignore no-explicit-any
      list.map((item: any) => console.log(`[${item.season_id}] ${item.title}`));
    }
  });
cli.help();

cli.version("0.0.1b");

cli.parse();
