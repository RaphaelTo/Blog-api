export const successResponse = (api) => {
    return {
        "type": "success",
        "result": api
    }
};

export const errorResponse = (api) => {
    return {
        "type": "error",
        "messageError": api
    }
};