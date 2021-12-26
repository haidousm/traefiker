import fs from "fs";
import YAML from "yaml";

export function getDockerComposeData(filepath: string) {
    const yaml = fs.readFileSync(filepath, "utf8");
    return YAML.parse(yaml);
}
