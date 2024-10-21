function codigoRandom(){


    let codigo: any = Math.floor(Math.random() * (9999 - 0) + 0);
    if ( codigo < 10) {
      codigo = ("000"+codigo)
    } else if (codigo < 100) {
        codigo = ("00"+codigo)
    } else if (codigo < 1000) {
        codigo = ("0"+codigo)
    }

    return codigo;
  }

export default codigoRandom;