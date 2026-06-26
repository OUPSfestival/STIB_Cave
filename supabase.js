const SUPABASE_URL = "https://wkyebgyvndkarigsotid.supabase.co";

const SUPABASE_KEY = "sb_secret_gUY55XH7HbNUBAYqP2FlFg_W5_rkaQr";


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
