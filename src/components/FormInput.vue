<template>
<div>
  <div>  
  <h1>Simple NIM Finder</h1>
  </div>
  <div>
    <h3> Mau cari nama dari sebuah NIM?</h3>
    <form>
        <label for="nim1">NIM:</label><br>
        <input class="w3-input w3-border" type="text" id="nim1" name="nim1" v-model="nim1" placeholder="Masukkan NIM yang dicari"> <br>
        <label for="nama1">Nama:</label><br>
        {{ this.nama1 }} <br>
       <!-- <input class="w3-input w3-border" type="text" id="nama1" name="nama1"> <br> -->
        <v-btn type="button"  @click="readnim()">Look</v-btn>

    </form>
</div>
<br>
<div>
    <h3> Mau menghapus data NIM?</h3>
    <form>
        <label for="nim2">NIM:</label><br>
        <input  class="w3-input w3-border" type="text" id="nim2" name="nim2" v-model="nim2" placeholder="Masukkan NIM yang akan dihapus">  <br>
        <v-btn type="button"  @click="deletenim()">Delete</v-btn>

    </form>
</div>
<br>
<div>
    <h3> Mau menambahkan data NIM?</h3>
    <form>
        <label for="nim3">NIM:</label><br>
        <input  class="w3-input w3-border" type="text" id="nim3" name="nim3" v-model="nim3" placeholder="Masukkan NIM baru"> <br>
        <label for="nama3">Nama:</label><br>
        <input  class="w3-input w3-border" type="text" id="nama3" name="nama3" v-model="nama3" placeholder="Masukkan Nama baru"> <br>
        <v-btn type="button"  @click="insertnim()">Insert</v-btn>

    </form>
</div>
<br>
<div>    
    <h3> Mau mengubah NIM?</h3>
    <form>
        <label for="nim4">NIM:</label><br>
        <div class="textbox">
        <input  class="w3-input w3-border" type="text" id="nim4" name="nim4" v-model="nim4" placeholder="Masukkan NIM yang ingin diubah"> <br>
        </div>
        <label for="nama4">Nama:</label><br>
        <div class="textbox">
        <input  class="w3-input w3-border" type="text" id="nama4" name="nama4" v-model="nama4" placeholder="Masukkan Nama baru"> <br>
        </div>
        <v-btn type="button"  @click="updatenim()">Update</v-btn>

    </form>
</div>
    </div>
</template>

<script>
//import {BackendF}  from './backend/app/controllers/simplenim.controller' //import fungsi backend


export default {


     data: () => ({
         nim1: '',
         nim2: '',
         nim3: '',
         nim4: '',
         nama1: '',
         nama2: '',
         nama3: '',
         nama4: '',
         dataNIM: [],
         backendURL: process.env.VUE_APP_BACKEND_URL

     })  , 
     methods:{
         
        getDataNIM(){
            //console.log("Baru mulai getdatanim")
            var url = this.backendURL + "/api/simplenims/"
            this.$axios.get(url)
                .then((res) =>{
                    
                    this.dataNIM = res.data.data
                    console.log("Succeed GET all data NIM")
                    this.message = res.message
                })
                .catch((err) => {
                    console.log("Error GET all data NIM")
                    this.message = err
                })
                
        }, 

        insertname() { 
            var url = this.backendURL + "/api/insert" //ganti url di azure, manggil url utk api prosesnya
            let data = {}
            data.firstname = document.getElementById("fname").value;
            data.lastname = document.getElementById("lname").value;

            var json = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset= UTF-8');
            xhr.onload = function() {
                console.log(xhr.responseText) //debugging kalo ada error
                var name = JSON.parse(xhr.responseText);
                if (xhr.readyState == 4 && xhr.status == "200") {
                    console.table(name)
                    alert("UDA MASUK YEY. \nSelamat makan " + data.firstname + " " + data.lastname + " dan berteriak di hutan rimba");
                } else {
                    console.error(name);
                }
            }
            xhr.send(json);
        },

        updatenim() { //fungsi 4 blom bisa
            var url = this.backendURL +  "/api/simplenims/"
            this.$axios.put(url, {
                nim: this.nim4,
                name: this.name4
            })
                .then((res) =>{ 
                    this.dataNIM = res.data
                    console.log("Succeed UPDATE NIM "+ this.nim4)
                    //console.log(this.dataNIM)
                    this.message = res
                    alert("Succeed UPDATE NIM "+ this.nim4)
                })
                .catch((err) => {
                    console.log("Error UPDATE NIM "+ this.nim4)
                    this.message = err
                    alert("Error UPDATE NIM "+ this.nim4)
                })
        },

        insertnim() {//fungsi 3
        var url = this.backendURL +  "/api/simplenims/"
            this.$axios.post(url, { //masih bad request 400
                nim: this.nim3,
                name: this.name3,

            })
                .then((res) =>{ 
                    this.dataNIM = res.data
                    console.log("Succeed INSERT NIM "+ this.nim3)
                    console.log(this.req.body)
                    //console.log(this.dataNIM)
                    this.message = res
                    alert("Succeed INSERT NIM "+ this.nim3)
                })
                .catch((err) => {
                    console.log("Error INSERT NIM "+ this.nim3 + " "+ this.nama3)
                    console.log(this.req)
                    this.message = err
                    alert("Error INSERT NIM "+ this.nim3 + " "+ this.nama3 + "\n"+ err)
                })
        
        },

        deletenim() {//fungsi 2
        var url = this.backendURL + "/api/simplenims/"+ this.nim2
        this.$axios.delete(url)
            .then((res) => {
                alert("Succeed DELETE NIM "+  this.nim2);
                console.log("Succeed DELETE NIM " + this.nim2)
                this.message = res
            })
            .catch((err) => {
                console.log("Error DELETE NIM "+ this.nim2)
                this.message = err
                alert("Error DELETE NIM "+ this.nim2)
            })
        },

        readnim() { //fungsi 1
            var url = this.backendURL +  "/api/simplenims/" + this.nim1
            this.$axios.get(url)
                .then((res) =>{
                    // console.log('req ', JSON.stringify(req))
                    console.log('res ', JSON.stringify(res))
                    this.nama1 = res.data.nama
                    console.log("Succeed GET data NIM " + this.nim1)
                    this.message = res.message
                })
                .catch((err) => {
                    console.log("Error GET data NIM " + this.nim1+ " " + this.backendURL)
                    alert("Error GET data NIM " + this.nim1 + " \n " + err)
                    this.message = err
                })                        
        }
     },
}
</script>

<style scoped>
.w3-border{
    border-color: black;
    width: 300px;
    height: 30px;
    background-color: #eeeeee;
}
</style>