const Hoob   = require('hoob');
const ticket = require('../misc/sample-ticket.js');

describe('Hoob creation',() => {

    test('A new empty Hoob is created',()=>{
        let x = new Hoob();
        expect(x).toBeDefined();
        expect(x._initVal).toStrictEqual({});
        // expect(x._patch).toStrictEqual({});
        expect(x._markAsDelete).toBeFalsy();
    });


    test('A non-empty Hoob is created',()=>{
        // let ticket  = {id:7};
        let x = new Hoob(ticket);
        expect(x).toBeDefined();
        // expect(x._patch).toStrictEqual({});
        expect(x._initVal).toStrictEqual(ticket);
        expect(x._markAsDelete).toBeFalsy();
    });

});

describe('Hoob manipulation', () => {

    let x;

    beforeEach(()=>{
        x = new Hoob(ticket);
    });

    test('Reading a Hoob attribute',()=>{
        expect(x).toMatchObject(ticket);
        expect(x.agent).toMatchObject(ticket.agent);
        expect(x.id).toBe(ticket.id);
    });

    test('Adding new Hoob attribute',()=>{
        // expect(x._patch).toStrictEqual({});
        x.requester = "batman";
        expect(x.requester).toBe('batman');
        expect(x).toMatchObject(Object.assign({requester:'batman'},ticket));
        // expect(x._patch).toStrictEqual({requester:'batman'});
    });

    test('Altering a Hoob attribute', ()=>{
        // expect(x._patch).toStrictEqual({});
        expect(x.priority).toBe(1);
        x.priority = 8;
        expect(x.priority).toBe(8);
        // expect(x._patch.priority).toBe(8);
        expect(x._initVal.priority).toBe(1);
    });

    test('Deleting a Hoob attribute', ()=>{
        expect(x.priority).toBe(1);
        delete x.priority;
        expect(x.priority).toBeUndefined();
        // expect(x._patch.priority).toBeUndefined();
    });


});

describe('Hoob recordwise functions',() => {
    let x;

    beforeEach(()=>{
        x = new Hoob(ticket);
    });


    test('Rollback Hoob', ()=>{
        expect(x.priority).toBe(1);
        // expect(x._patch).toStrictEqual({});
        x.priority = 8;
        expect(x.priority).toBe(8);
        // expect(x._patch).toStrictEqual({priority:8});
        x.rollBackAttributes();
        expect(x.priority).toBe(1);
        // expect(x._patch).toStrictEqual({});

    });


    test('Check for Dirty attributes', () => {
        expect(x.hasDirtyAttributes()).toBeFalsy();
        x.priority = 3;
        expect(x.hasDirtyAttributes()).toBeTruthy();
        // x.rollBackAttributes();
        // expect(x.hasDirtyAttributes()).toBeFalsy();
    });



    test.skip('Changed attributes', ()=>{
        expect(x.changedAttributes()).toStrictEqual({});
        x.val.name = "Batman Origins";
        expect(x.changedAttributes()).toStrictEqual({name:['batman','Batman Origins']});

    });


    test.skip('Delete a Record', ()=>{
        expect(x._markAsDelete).toBeFalsy();
        x.deleteRecord();
        expect(x._markAsDelete).toBeTruthy();
        x.rollBackAttributes();
        expect(x._markAsDelete).toBeFalsy();
    });


});


//
// test('Adding a new value to snapshot' , () => {
//     let x = new snapshot({x:1});
// });
//
//
// test('removing a value');
//
// test('updating  the vavlue');
//
// test();
