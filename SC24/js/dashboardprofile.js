import { createToast } from '../toast/script.js'
import { supabase } from './supa.js'

const getImage = async () => {
    const { data, error } = await supabase
        .from('users')
        .select('profilepic')
        .match({ email: email })

    localStorage.setItem("imageurl", data[0]['profilepic'])
    if (!error) document.getElementById("profilepic").src = localStorage.getItem("imageurl");
    if (error) console.log(error);
}

let name, email;
const onloading = async () => {
    name = localStorage.getItem("username");
    document.getElementById("playername").innerHTML = name;
    email = localStorage.getItem("email");
    document.getElementById("playeremail").innerHTML = email;
    document.getElementById("playeremail").href = `mailto:${email}`;
    getImage();

    // leaderboard = localStorage.getItem("leaderboard");
    // document.getElementById("leaderboard").innerHTML = leaderboard;
    // progress = localStorage.getItem("progress");
};

const uploadImage = async (e) => {
    var fileInput = document.getElementById('newimgfile');
    var file = fileInput.files[0];
    let email = localStorage.getItem("email");
    e.preventDefault();
    if (file) {
        var formData = new FormData();
        formData.append('file', file);
        try {
            // Upload the file to Supabase Storage
            const { error } = await supabase.storage
                .from('Profile')
                .upload(email, formData, {
                    cacheControl: '3600',
                    upsert: true,
                });
            // console.log(data)
            if (error) {
                console.error('Error uploading image:', error);
            } else {
                // console.log('Image uploaded successfully:', data);
                const { error1 } = await supabase
                    .from('users')
                    .update({ profilepic: `https://zknxbvmxrrhrrybszbny.supabase.co/storage/v1/object/public/Profile/${email}` })
                    .match({ email: email })
                console.log(error1)
                createToast("success", "Image Uploaded");
                document.getElementById("extracontainer3").classList.remove("open");
            }
        } catch (error) {
            console.error('Error uploading image:', error.message);
            createToast("error", "Error uploading image")
        }
    } else {
        createToast("warning", "No file selected")
    }
}

onloading();
document.getElementById("uploadnewpic").addEventListener("click", () => {
    document.getElementById("extracontainer3").classList.add("open");
})
document.getElementById("uploadimage").addEventListener("click", uploadImage);

document.getElementById("exit").addEventListener("click", () => {
    window.localStorage.clear();
    window.location.replace("../html/login.html");
})



//Upload 5 pics

// const uploadImageanalyzer = async (index) => {
//     var newid = `newimgfile${index}`;
//     // console.log(newid);
//     var fileInput = document.getElementById(newid);
//     var file = fileInput.files[0];
//     // let email = localStorage.getItem("email");
//     if (file) {
//         var formData = new FormData();
//         formData.append('file', file);
//         console.log(formData);
//         try {
//             // Upload the file to Supabase Storage
//             const { error } = await supabase.storage
//                 .from('Analyzer')
//                 .upload(index, formData, {
//                     cacheControl: '3600',
//                     upsert: true,
//                 });
//             console.log(data)
//             if (error) {
//                 console.error('Error uploading image:', error);
//             }
//             // } 
//             else {
//                 console.log('Image uploaded successfully:', data);
//             //     const { error1 } = await supabase
//             //         .from('users')
//             //         .update({ profilepic: `https://zknxbvmxrrhrrybszbny.supabase.co/storage/v1/object/public/Profile/${email}` })
//             //         .match({ email: email })
//             //     console.log(error1)
//             //     createToast("success", "Image Uploaded");
//             //     document.getElementById("extracontainer3").classList.remove("open");
//             }
//         } catch (error) {
//             console.log('Error uploading image:', error.message);
//             createToast("error", "Error uploading image")
//         }
//     } else {
//         createToast("warning", "No file selected")
//     }
// }

const uploadImageanalyzer = async (index) => {
    var newid = `newimgfile${index}`;
    var newindex=3+index;
    var container = `extracontainer${newindex}`;
    console.log(container);
    var fileInput = document.getElementById(newid);
    var file = fileInput.files[0];

    if (file) {
        var formData = new FormData();
        formData.append('file', file);

        try {
            // Upload the file to Supabase Storage
            const { data, error } = await supabase.storage
                .from('Analyzer')
                .upload(newid, formData, {
                    cacheControl: '3600',
                    upsert: true,
                });
            if (error) {
                console.error('Error uploading image:', error);
            } else {
                console.log('Image uploaded successfully:', data);
                document.getElementById(container).classList.remove('open');
                let box = document.getElementById(`box${index}`);
                box.innerHTML = '';
                let img = document.createElement("img");
                img.src = `https://zknxbvmxrrhrrybszbny.supabase.co/storage/v1/object/public/Analyzer/${newid}`;
                img.alt = `${newid}`;
                img.height="150";
                img.width="150";
                box.append(img);
                if(newindex===8) {
                    document.getElementById("report").style.display ="block";
                }
                // Add any further actions for successful upload if needed
            }
        } catch (error) {
            console.error('Error uploading image:', error.message);
            createToast("error", "Error uploading image");
        }
    } else {
        createToast("warning", "No file selected");
    }
}



document.getElementById("uploadimage1").addEventListener("click", () => {
    document.getElementById("extracontainer4").classList.add("open");
})
document.getElementById("uploadimageanalyzer1").addEventListener("click",() =>{ uploadImageanalyzer(1)});

document.getElementById("uploadimage2").addEventListener("click", () => {
    document.getElementById("extracontainer5").classList.add("open");
})
document.getElementById("uploadimageanalyzer2").addEventListener("click", () =>{ uploadImageanalyzer(2)});

document.getElementById("uploadimage3").addEventListener("click", () => {
    document.getElementById("extracontainer6").classList.add("open");
})
document.getElementById("uploadimageanalyzer3").addEventListener("click", () =>{ uploadImageanalyzer(3)});

document.getElementById("uploadimage4").addEventListener("click", () => {
    document.getElementById("extracontainer7").classList.add("open");
})
document.getElementById("uploadimageanalyzer4").addEventListener("click", () =>{ uploadImageanalyzer(4)});

document.getElementById("uploadimage5").addEventListener("click", () => {
    document.getElementById("extracontainer8").classList.add("open");
})
document.getElementById("uploadimageanalyzer5").addEventListener("click", () =>{ uploadImageanalyzer(5)});



document.getElementById("closereport").addEventListener("click", () => {
    console.log("click");
    document.getElementById("closereport").style.display = "none";
    document.getElementById("downloadreport").style.display = "none";
    let report = document.getElementById("report");
    report.classList -= "open";
  
  })