import { cac, path } from "../deps.ts";
import { bbJsonToSrt } from "./utils/index.ts";

const cli = cac("bilibili");

cli
  .command("epinfo <epId>", "View EP info")
  .action(async (epId, options) => {
    await fetch(
      `https://api.global.bilibili.com/intl/gateway/web/view?oid=${epId}&tp=3&s_locale=th_TH`,
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.error(err);
      });
  });

cli
  .command("sub <epId>", "Get subtitle")
  .action(async (epId, options) => {
    await fetch(
      `https://api.biliintl.com/intl/gateway/m/subtitle?build=1&ep_id=${epId}&s_locale=th_TH`,
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.error(err);
      });

    // deno-lint-ignore no-explicit-any
    //subtitles.map(async (item: any) => {
    // const { key, url } = item;
    // const dest = `[${key}] ${path.basename(url).replace(".json", ".srt")}`;
    //  const res = await fetch(url);
    //  const data = await res.json();
    // bbJsonToSrt(dest, data);
    //  console.log(dest);
    //});
  });

cli
  .command("vid <epId>", "Video Download (Soon)")
  .action(async (epId, options) => {
    await fetch(
      `https://api.biliintl.com/intl/gateway/web/playurl?&device=wap&ep_id=${epId}&platform=web&qn=64&s_locale=th_TH`,
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.error(err);
      });
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

cli.version("0.0.1");

cli.parse();
