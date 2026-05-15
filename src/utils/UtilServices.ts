import { servicesMock } from "../data/ServicesMock";
import type { FilterServices, ServiceMock } from "../interfaces/InterfaceServices";

function FunServices(search: string, filters: FilterServices = {}): ServiceMock[]{

    let result = servicesMock

    if(search.trim()){
        const text = search.toLocaleLowerCase().trim()
        result = result.filter(services => (
            services.name.toLocaleLowerCase().includes(text) || 
            services.category.toLocaleLowerCase().includes(text) || 
            services.company.toLocaleLowerCase().includes(text) || 
            services.zone.toLocaleLowerCase().includes(text) || 
            services.description.toLocaleLowerCase().includes(text)  
        ))
    }

    if (filters.category){
        result = result.filter((services => services.category === filters.category))
    }

    if (filters.zone){
        result = result.filter((services => services.zone === filters.zone))
    }

    if (filters.maxPrice){
        result = result.filter((services => services.price <= filters.maxPrice!))
    }

    if (filters.availability){
        result = result.filter((services => services.availability === filters.availability))
    }

    if (filters.rating){
        result = result.filter((services => services.rating === filters.rating!))
    }

    return result

}
export default FunServices