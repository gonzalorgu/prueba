import { computed, onMounted, ref, watch } from "vue";
export const useSimpson = <T>(url: string | (() => string)) => {

    const data = ref<T | null>(null)
    const hasError = ref(false)
    const error = ref<Error | null>(null)
    const isLoading = ref(true)

    const fetchCache = new Map<string, T>()

    const reactiveUrl = computed(() => {
        return typeof url === 'function' ? url() : url;
    });
    onMounted(() => {
        fetchData();
    })

    watch(reactiveUrl, () => {
        fetchData();
    })

    async function fetchData() {
        if (fetchCache.has(reactiveUrl.value)) {
            data.value = fetchCache.get(reactiveUrl.value)!;
            return;
        }

        isLoading.value = true;
        error.value = null;
        hasError.value = false;

        try {
            const response = await fetch(reactiveUrl.value)
            const responseData = await response.json();

            data.value = responseData;
            fetchCache.set(reactiveUrl.value, responseData)
        } catch (e) {
            error.value = e as Error;
            hasError.value = true;
        } finally {
            isLoading.value = false
        }

    }

    return {
        data,
        hasError,
        isLoading,
        error

    };

};
