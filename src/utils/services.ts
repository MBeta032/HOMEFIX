import { servicesMock } from "../data/ServicesMock";
import type { ServiceMock } from "../interfaces/data";

function normalizeText(value: string): string {
    return value
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
}

function SearchServices(search: string): ServiceMock[]{
    const text = normalizeText(search)

    if(!text) return servicesMock

    return servicesMock.filter(services => 
        normalizeText(services.name).includes(text) || 
        normalizeText(services.category).includes(text) || 
        normalizeText(services.company).includes(text) || 
        normalizeText(services.zone).includes(text) || 
        normalizeText(services.description).includes(text)  
    )
}
export default SearchServices