export const setupCounter = ($: any): void => {
    ($('[data-toggle="counter-up"]') as any).counterUp({
        delay: 10,
        time: 2000
    });
};
export{};