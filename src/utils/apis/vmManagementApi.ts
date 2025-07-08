import { settings } from "../config";
import { postData, getData } from "../connectivity";
import { IMetricValue } from "../types";

export const resetServer =  (server_id: string) =>{
    return postData(`${settings.api.vm_management}/servers/${server_id}/actions/reset` , {});
}
export const resumeServer =  (server_id: string) =>{
    return postData(`${settings.api.vm_management}/servers/${server_id}/actions/unshelve` , {});
}
export const suspendServer =  (server_id: string) =>{
    return postData(`${settings.api.vm_management}/servers/${server_id}/actions/shelve` , {});
}

export const getGUILink = async() =>{
    return (await getData<{data: {base_url: string}}>(`${settings.api.vm_management}/guacamole/base-url`)).data.base_url;
}

export const getCPUUsage = async(server_id: string, time_range?: number) =>{
    return (await getData<IMetricValue>(`${settings.api.vm_management}/metrics/resources/${server_id}/cpu`, {
        params: { time_range }
    }));
}

export const getMemoryUsage = async(server_id: string, time_range?: number) =>{
    return (await getData<IMetricValue>(`${settings.api.vm_management}/metrics/resources/${server_id}/memory`, {
        params: { time_range }
    }));
}

export const getDiskUsage = async(server_id: string, time_range?: number) =>{
    return (await getData<{ [disk: string]: IMetricValue }>(`${settings.api.vm_management}/metrics/resources/${server_id}/disk`, {
        params: { time_range }
    }));
}

export const getNetworkUsage = async(server_id: string, time_range?: number) =>{
    return (await getData<{ [direction: string]: IMetricValue }>(`${settings.api.vm_management}/metrics/resources/${server_id}/network`, {
        params: { time_range }
    }));
}

