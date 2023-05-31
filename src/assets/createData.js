function createData(terminal,name) {
    return { terminal,name};
  }

function createTotalData(terminal,name,dispensor_fitness,dispensor_supply,hopper1_supply,hopper2_supply,hopper3_supply,hopper4_supply,encryptor,card_reader){
  return {terminal,name,dispensor_fitness,dispensor_supply,hopper1_supply,hopper2_supply,hopper3_supply,hopper4_supply,encryptor,card_reader}
}


  module.exports={createData,createTotalData}