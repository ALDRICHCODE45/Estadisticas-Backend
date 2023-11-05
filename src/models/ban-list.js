import { Band } from "./band";
export class BandList {
  constructor() {
    this.bands = [];
  }
  createBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }
  removeBands(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }
  getBands() {
    return this.bands;
  }
  increaseVotes(id) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes += 1;
      }
      return band;
    });
  }
  changeBandName(id, newName) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.name = newName;
      }
      return band;
    });
  }
}
