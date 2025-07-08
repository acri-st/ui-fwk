
export type IComponentVersion = {
    id: string
    version: string
}
export type IVersion = {
    application: string
    components: {
        [component: string]: IComponentVersion
    }
    terms_and_conditions: string
}