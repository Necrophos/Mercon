export function mapColor(obj: any): Color[] {
    let array = [];
    for (const key in obj) {
      array.push({ id: key, color: obj[key] });
    }
    return array;
  }
  
  export interface Color {
    id: string;
    color: any;
  }
  