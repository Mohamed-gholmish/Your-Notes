import axios from "axios";
import Swal from "sweetalert2";

export async function getNotes({token , userInfo ,updater}){
    const userDetails = {
      token,
      userID: userInfo._id,
    };
  
    let  {data } = await axios.post(
      "https://sticky-note-fe.vercel.app/getUserNotes",
      userDetails,
    );
    // console.log(data);
   if(data.message === "success"){
    console.log("okok");
    updater(data.Notes);}

   if(data.message === "no notes found") {updater([]);};

 }

 export async function deleteNotes({NoteID,token ,userInfo ,updater}){
  const deletedNoteInfo ={ 
   
    token,
    NoteID,
  }
  let {data} = await axios.delete("https://sticky-note-fe.vercel.app/deleteNote", { data: deletedNoteInfo })
  console.log(data);
  getNotes({token , userInfo ,updater});
 }

 export function showDeleteAllert({NoteID,token ,userInfo ,updater}){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteNotes({NoteID,token ,userInfo ,updater});
      Swal.fire(
        'Deleted!',
        'Your note has been deleted.',
        'success'
      )
    }
  })
 }
 