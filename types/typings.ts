export type GameTestModules = {
    name: "mojang-minecraft";
    uuid: "b26a4d4c-afdf-4690-88f8-931846312678";
    version: { major: 0; minor: 1; patch: 0 };
} | {
    name: "mojang-gametest";
    uuid: "6f4b6893-1bb6-42fd-b458-7fa3d0c89616";
    version: { major: 0; minor: 1; patch: 0 };
} | {
    name: "mojang-minecraft-ui";
    uuid: "2bd50a27-ab5f-4f40-a596-3641627c635e";
    version: { major: 0; minor: 1; patch: 0 };
};

export type validRange = null | {
    min: number;
    max: number;
};

export type baseTypes = {
    is_read_only?: boolean;
    is_static?: boolean;
    closure_type?: {
        argument_types: baseTypes[];
        return_type: baseTypes;
    };
    element_type: elementType;
    from_module?: GameTestModules;
    is_bind_type: boolean;
    is_errorable: boolean;
    name: string;
    valid_range: validRange;
    value?: any;
    type?: baseTypes;
};

export type elementType = null | baseTypes;

export type functions = {
    arguments: {
        details: null | {
            default_value: any;
            max_value: any;
            min_value: any;
        };
        name: string;
        type: baseTypes[];
    } | baseTypes[];
    is_constructor: boolean;
    is_member: boolean;
    is_static: boolean;
    name: string;
    return_type: baseTypes[];
};

type minecraftVersion =
    | "1.16.201"
    | "1.16.210"
    | "1.16.220"
    | "1.17.0"
    | "1.17.10"
    | "1.17.30"
    | "1.17.40"
    | "1.18.0"
    | "1.18.10"
    | "1.18.30"
    | "1.19.0"
    | "1.19.10";

export interface docs_raw {
    classes: {
        base_types: baseTypes[];
        constants: baseTypes[];
        functions: functions[];
        module: GameTestModules;
        name: string;
        properties: baseTypes[];
        type: baseTypes;
    }[];
    constants: baseTypes[];
    dependencies: GameTestModules[];
    enums: {
        constants: baseTypes[];
        module: GameTestModules;
        name: string
    }[];
    functions: functions[];
    minecraft_version: minecraftVersion;
    name: GameTestModules["name"];
    objects: baseTypes[];
    uuid: GameTestModules["uuid"];
    version: GameTestModules["version"];
}
