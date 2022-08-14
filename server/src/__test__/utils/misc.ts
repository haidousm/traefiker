import supertest from "supertest";

export const executeTestCase = async (testCase: {
    title: string;
    sendRequest: () => supertest.Test;
    res: { status: number; body?: any };
    mocks: () => void;
}) => {
    testCase.mocks();
    const expectedRes = testCase.res;
    const res = await testCase.sendRequest();
    if (expectedRes.status) {
        expect(res.status).toBe(expectedRes.status);
    }
    if (expectedRes.body) {
        expect(res.body).toEqual(JSON.parse(JSON.stringify(expectedRes.body))); // need to do this so that dates become strings :(
    }
    jest.clearAllMocks();
};
