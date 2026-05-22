import { servicesMock } from "../data/ServicesMock";
import type { FilterServices, ServiceMock } from "../interfaces/InterfaceServices";

function normalizeText(value: string): string {
    return value
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
}

function FunServices(search: string, filters: FilterServices = {}): ServiceMock[]{

    let result = servicesMock

    if(search.trim()){
        const text = normalizeText(search)
        result = result.filter(services => (
            normalizeText(services.name).includes(text) || 
            normalizeText(services.category).includes(text) || 
            normalizeText(services.company).includes(text) || 
            normalizeText(services.zone).includes(text) || 
            normalizeText(services.description).includes(text)  
        ))
    }

    if (filters.category){
        result = result.filter((services => services.category === filters.category))
    }

    if (filters.company){
        result = result.filter((services => services.company === filters.company))
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
        result = result.filter((services => services.rating >= filters.rating!))
    }

    return result

}
export default FunServices