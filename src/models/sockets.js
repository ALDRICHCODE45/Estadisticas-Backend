import { BandList } from "./ban-list";

export class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {
    //on Connection
    this.io.on("connection", (socket) => {
      console.log("cliente conectado");
      //emitir las bandas
      socket.emit("current-bands", this.bandList.getBands());
      socket.on("increase-vote", (id) => {
        this.bandList.increaseVotes(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("delete-band", (id) => {
        this.bandList.removeBands(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("change-name", ({ id, newName }) => {
        this.bandList.changeBandName(id, newName);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("create-band", ({ name }) => {
        this.bandList.createBand(name);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}
