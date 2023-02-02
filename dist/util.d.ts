export declare function getOctokit(): import("@octokit/core").Octokit & import("@octokit/plugin-rest-endpoint-methods/dist-types/types").Api & {
    paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
};
export declare function getComment(octokit: ReturnType<typeof getOctokit>, comment: string, args: {
    [key: string]: string;
}): Promise<string>;
