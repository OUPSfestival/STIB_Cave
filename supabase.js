const SUPABASE_URL = "https://wkyebgyvndkarigsotid.supabase.co";

const SUPABASE_KEY = "sb_publishable_fFb_-yfTWgWUdTy3uLxKWA_hR4GzCig";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
async function testSupabase(){

const {data,error}=await supabaseClient
.from("articles")
.select("*");


console.log(data);
console.log(error);

}


testSupabase();
