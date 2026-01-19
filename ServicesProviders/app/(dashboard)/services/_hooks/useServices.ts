import { useServiceStore } from "./useServiceStore";

export function useServices() {
    return useServiceStore((state) => state.getFilteredServices());
}

export function useService(id: string) {
    return useServiceStore((state) => state.getServiceById(id));
}

export function useServiceSearch() {
    const searchQuery = useServiceStore((state) => state.searchQuery);
    const setSearchQuery = useServiceStore((state) => state.setSearchQuery);
    return { searchQuery, setSearchQuery };
}

export function useServiceFilters() {
    const filters = useServiceStore((state) => state.filters);
    const setFilters = useServiceStore((state) => state.setFilters);
    const clearFilters = useServiceStore((state) => state.clearFilters);
    return { filters, setFilters, clearFilters };
}

export function useServiceActions() {
    const addService = useServiceStore((state) => state.addService);
    const updateService = useServiceStore((state) => state.updateService);
    const deleteService = useServiceStore((state) => state.deleteService);
    return { addService, updateService, deleteService };
}
