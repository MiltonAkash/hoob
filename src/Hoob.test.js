const Hoob = require("./Hoob")
// @ponicode
describe("rollBackAttributes", () => {
    let inst

    beforeEach(() => {
        inst = new Hoob()
    })

    test("0", () => {
        let callFunction = () => {
            inst.rollBackAttributes()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("changedAttributes", () => {
    let inst

    beforeEach(() => {
        inst = new Hoob()
    })

    test("0", () => {
        let callFunction = () => {
            inst.changedAttributes()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("deleteRecord", () => {
    let inst

    beforeEach(() => {
        inst = new Hoob()
    })

    test("0", () => {
        let callFunction = () => {
            inst.deleteRecord()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("Hoob.isExternal", () => {
    test("0", () => {
        let callFunction = () => {
            Hoob.isExternal("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            Hoob.isExternal("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            Hoob.isExternal("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            Hoob.isExternal(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
