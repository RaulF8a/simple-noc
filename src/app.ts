import { envs } from "./plugins/envs.plugin";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

function main() {
    Server.start();
}
