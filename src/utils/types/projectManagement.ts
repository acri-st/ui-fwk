import { IUser } from "./authentication"
import { IServer } from "./vmManagement"


/** ======================================
 *  PROJECTS
 * ====================================== */
export type IProjectRepository = {
    id: string
    username: string
    url: string
    token: string
}
export type IProjectProfile = {
    id: string
    username: string
    url: string
    token: string
    password: string
}
export type IProject = {
    id: string
    name: string
    ssh_key: string

    profile: IProjectProfile
    flavor: IFlavor
    operatingsystem: IOperatingSystem
    repository: IProjectRepository
    applications: IApplication[]
    server: IServer|null

    pipeline_id?: string
    status?: BuildStatus
    docker_image?: string
    logs?: string
    logsParsed?: {step: string, log?:string}[]
    // logsParsed?: string[]
}

export type ICreateProject = {
    // id: string
    name: string
    ssh_key: string
    flavor_id: string
    // repository_id: string
    operatingsystem_id: string
    application_ids: string[]
}


/** ======================================
 *  BUILD STATUS
 * ====================================== */
export enum BuildStatus {
    "STARTED"="STARTED",
    "SUCCEEDED"="SUCCEEDED",
    "FAILED"="FAILED",
}
export enum BuildStep {
    "PIPELINE"="PIPELINE",
    "BUILD"="BUILD",
    "SCAN"="SCAN",
}
export enum PipelineStatus{
    "PENDING"="PENDING",
    "CANCELED"="CANCELED",

    "RUNNING"="RUNNING",
    "STARTED"="STARTED",
    "SUCCEEDED"="SUCCEEDED",
    "FAILED"="FAILED",
}
export enum PipelineStep{
    "pipeline"="pipeline",
    "build"="build",
    "scan"="scan",
}

export type IBuildStatus = {
    project_id: string
    build_status: {
        // pipeline_id: string
        status: PipelineStatus
        logs?: string
        docker_image?: string
    }
}
export type IProjectBuildStatus = {
    status: BuildStatus
    step: BuildStep
    pipeline_id: string
    message: string
}

/** ======================================
 *  APPLICATIONS
 * ====================================== */
export type IApplication = {
    id: string
    name: string
    description: string
    icon: string

    available_operatingsystems?: IApplicationOperationSystem[]
}

export type IApplicationForm = {
    name?: string
    description?: string
    icon?: File
}
export type IApplicationOperationSystem = {
    id: string
    name: string
    script: string
}

/** ======================================
 *  OPERATING SYSTEMS
 * ====================================== */
export type IOperatingSystem = {
    id: string
    name: string
    is_gui: boolean

    applications: IApplication[]
}
export type IOperatingSystemForm = {
    name: string
    is_gui: boolean
}
export type IApplicationOperationSystemForm = {
    script: string
}


/** ======================================
 *  FLAVORS
 * ====================================== */
export type IFlavor = {
    id: string
    name: string

    processor: string 
    storage: string
    gpu: string

    bandwidth: string 
    memory: string 
    price: string 

    openstack_flavor_id: string
}
export type IFlavorForm = {
    name: string

    processor: string 
    storage: string
    gpu: string

    bandwidth: string 
    memory: string 
    price: string 

    openstack_flavor_id: string
}

/** ======================================
 *  RESOURCES
 * ====================================== */
export type IResource = {
    id: string
} & ICreateResource

export type ICreateResource = {
    bandwidth: string 
    created_at: string 
    id: string 
    memory: string 
    name: string 
    pool_name?: string
    price: string 
    processor: string 
    storage: string
    system: string 
    updated_at: string 
}

/** ======================================
 *  EVENTS
 * ====================================== */
export type IEvent = {
    id: string|number
    project_id: string
    
    type: 'pipeline'|'VM'
    step: PipelineStep
    status: PipelineStatus

    content: string
    pipeline_id: string

    created_at: string
}
