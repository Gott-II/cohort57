let x: number = 42;
console.log('Hallo TypeScript');

// Typing

// implicit -versteckte typisierung 
let myName = 'Gottfried';
// myName = 99; // Error: Type 'number' is not assignable to type 'string'  
// Typs werden automatisch zugewiesen = string, number, boolean, bigint, symbol, null, undefined

//explicit - sichtbare typisierung
let isDrinking: boolean = true;
isDrinking = false;
// isDrinking = 1; // Error: Type 'number' is not assignable to type 'boolean'

// wir könnenprimitve types und komplexe types verwenden
// primitive types: string, number, boolean, bigint, symbol, null, undefined
let age: number;
age = 42;
// age = '42'; // Error: Type 'string' is not assignable to type 'number'

//Union Types -Aufzählin mit hilfe von |
let mixed: string | number;
mixed = 'Hello';
mixed = 99;
// mixed = true; // Error: Type 'boolean' is not assignable to type 'string | number'

// oder 

type Gender = "male"| "female";

let myGender : Gender = "male";

type ExtendetGender = Gender | "divers";

let yourGender : ExtendetGender = "divers";

// complex types: arrays, objects, tuples, enums

type CarBody = "sedan" | "coupe" | "suv" | "combi suv";

let myCarBody: CarBody = "coupe";

// Array
let hobbies: string[] = ['Sports', 'Cooking'];
hobbies.push('Reading');
// hobbies.push(99); // Error: Argument of type 'number' is not assignable to parameter of type 'string'

// const personalInfo:[string, number] = ['Gottfried', 42];- nur in der rehenfolge
// Tuple - fester typ und feste länge
const personalInfo: [string, number] = ['Gottfried', 42];
// const personalInfo: [string, number] = [42, 'Gottfried']; // Error: Type 'number' is not assignable to type 'string'

// objects macht man durch interfaces
interface Person {
    name: string;
    age: number | undefined; // optional property
    isMarried?: boolean; // optional property
}

const person: Person = {
    name: 'Gottfried',
    age: 42
};

 21:25
type Instrument = "guitar" | "bass" | "piano" | "drumms" | "flute" | "voice";
interface Musician {
    name: string;
    instrument: Instrument[];
    isActive: boolean;
}

interface Group {
    name: string;
    members: Musician[];
    
}

const markKnopfler: Musician = {
    name: "Mark Knopfler",
    instrument: ["guitar", "voice"],
    isActive: true
};

const pickWithers: Musician = {
    name: "Pick Withers",
    instrument: ["drumms"],
    isActive: true
}

const direStraits: Group = {
    name: "Dire Straits",
    members: [markKnopfler, pickWithers]
};

function sum(a: number, b: number): number {
    return a + b;
}
// void wenn keine rückgabe
function sayHello(): void {
    console.log('Hello!');
}

const devide = (a: number, b: number): number => a / b;
