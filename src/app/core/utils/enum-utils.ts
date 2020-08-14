export class EnumUtils {
    public static enumToArray(enumerator: {[id: number]: string}): string[] {
        return Object.keys(enumerator)
            .filter(value => !isNaN(Number(value)))
            .map(key => enumerator[+key]);
    }
}
