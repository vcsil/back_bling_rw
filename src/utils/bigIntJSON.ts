// Extends BigInt global interface to add toJSON method
declare global {
    interface BigInt {
        toJSON(): string;
    }
}

// Adds the toJSON method to the BigInt object prototype
// eslint-disable-next-line func-names, no-extend-native
BigInt.prototype.toJSON = function () {
    return this.toString();
};

export {};
