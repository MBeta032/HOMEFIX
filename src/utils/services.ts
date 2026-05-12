import { servicesMock } from "../data/ServicesMock";
import type {   ServiceMock } from "../interfaces/data";

function SearchServices(search: string): ServiceMock[]{
    if(!search.trim()) return servicesMock

    const text = search.toLowerCase().trim()

    return servicesMock.filter(services => 
        services.name.toLocaleLowerCase().includes(text) || 
        services.category.toLocaleLowerCase().includes(text) || 
        services.company.toLocaleLowerCase().includes(text) || 
        services.zone.toLocaleLowerCase().includes(text) || 
        services.description.toLocaleLowerCase().includes(text)  
    )
}
export default SearchServices