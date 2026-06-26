const SUPABASE_URL = "https://wkyebgyvndkarigsotid.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndreWViZ3l2bmRrYXJpZ3NvdGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0NzM3OTksImV4cCI6MjA5ODA0OTc5OX0.gh-OJwVwoknq0kZrVgZ5vlZdHMCNl6amF0kgnF3Zrg4";


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
