const testResolver = {
    Query: {
        hello: () => 'Hello, world!',
        info: () => ({ name: 'John Doe', age: 25 }),
    }
};

export default testResolver;