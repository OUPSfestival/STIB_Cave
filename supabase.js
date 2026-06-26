const SUPABASE_URL = "https://wkyebgyvndkarigsotid.supabase.co";

const SUPABASE_KEY = "gbBByA0Zoo9RhgsgQgEU0Q_vUhsyGjB";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


async function testSupabase(){

const {data,error}=await supabaseClient
.from("articles")
.select("*");


console.log("DATA:",data);

console.log("ERROR:",error);

}


testSupabase();
