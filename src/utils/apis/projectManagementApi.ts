import { settings } from "../config";
import { getData, postData, deleteData, patchData, putData } from "../connectivity";
import { IProject, ICreateProject, IFlavor, IOperatingSystem, IEvent, IBuildStatus, IApplication, IApplicationForm, IFlavorForm, IOperatingSystemForm } from "../types";

/** ======================================
 *  PROJECTS
 * ====================================== */
// PROJECTS
export const getProjects = () =>{
    return getData<IProject[]>(`${settings.api.project_management}/projects_by_profile`);
    // return getData<IProject[]>(`${settings.api.project_management}/projects`);
}
export const getProject = (projectId: string) =>{
    return getData<IProject>(`${settings.api.project_management}/projects/${projectId}`);
}
export const createProject = (data: ICreateProject) =>{
    return postData(`${settings.api.project_management}/projects`, data)
}

export const deleteProject =  (project_id: string) =>{
    return deleteData(`${settings.api.project_management}/projects/${project_id}` );
}

/** ======================================
 *  FLAVORS
 * ====================================== */
export const getFlavors = (): Promise<IFlavor[]> =>{
    return getData<IFlavor[]>(`${settings.api.project_management}/flavors`);
}
export const getFlavor = (id: string): Promise<IFlavor> =>{
    return getData<IFlavor>(`${settings.api.project_management}/flavors/${id}`);
}
export const deleteFlavor = (id: string): Promise<IFlavor> =>{
    return deleteData<IFlavor>(`${settings.api.project_management}/flavors/${id}`);
}
export const createFlavor = (data: IFlavorForm): Promise<IFlavor> =>{
    return postData(`${settings.api.project_management}/flavors`, data)
}
export const updateFlavor = (id: string, data: IFlavor) =>{
    return patchData(`${settings.api.project_management}/flavors/${id}`, data )
}


/** ======================================
 *  OPERATING SYSTEMS
 * ====================================== */
export const getOperatingSystems = (params?: {}): Promise<IOperatingSystem[]> =>{
    return getData<IOperatingSystem[]>(`${settings.api.project_management}/operatingsystems`, { params });
}
export const getOperatingSystem = (id: string): Promise<IOperatingSystem> =>{
    return getData<IOperatingSystem>(`${settings.api.project_management}/operatingsystems/${id}`);
}
export const deleteOperatingSystem = (id: string): Promise<IOperatingSystem> =>{
    return deleteData<IOperatingSystem>(`${settings.api.project_management}/operatingsystems/${id}`);
}

export const createOperatingSystem = (data: IOperatingSystemForm): Promise<IOperatingSystem> =>{
    return postData(`${settings.api.project_management}/operatingsystems`, data)
}

export const updateOperatingSystem = (id: string, data: IOperatingSystem) =>{
    return patchData(`${settings.api.project_management}/operatingsystems/${id}`, data )
}




/** ======================================
 *  EVENTS
 * ====================================== */
export const getProjectEvents = (project: IProject): Promise<IEvent[]> =>{
    return getData<IEvent[]>(`${settings.api.project_management}/projects/${project.id}/events`);
}
export const getProjectBuildStatus = (project: IProject): Promise<IBuildStatus> =>{
    return getData<IBuildStatus>(`${settings.api.project_management}/projects/${project.id}/build-status`);
}


/** ======================================
 *  APPLICATIONS
 * ====================================== */
export const getApplications = (params?: {}): Promise<IApplication[]> =>{
    return getData<IApplication[]>(`${settings.api.project_management}/applications`, { params })
}

export const getApplication = (id: string): Promise<IApplication> =>{
    return getData<IApplication>(`${settings.api.project_management}/applications/${id}`);
}

export const deleteApplication = (id: string) =>{
    return deleteData<IApplication>(`${settings.api.project_management}/applications/${id}`)
}

export const createApplication = (body: IApplicationForm): Promise<IApplication> =>{
    return postData(`${settings.api.project_management}/applications`, body)
}

export const updateApplication = (id: string, body: IApplicationForm) =>{
    return patchData(`${settings.api.project_management}/applications/${id}`, body)
}

export const createApplicationOperatingSystem = (appId: string, osId: string, script?: string) =>{
    return putData(`${settings.api.project_management}/applications/${appId}/installation`, {
        operatingsystem_id: osId,
        script: script || ""
    })
}

export const updateApplicationOperatingSystem = (appId: string, osId: string, script: string) =>{
    return putData(`${settings.api.project_management}/applications/${appId}/installation`, {
        operatingsystem_id: osId,
        script
    })
    
}



