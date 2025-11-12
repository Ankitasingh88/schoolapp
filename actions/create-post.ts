'use server'
import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "../utils/supabase/server-client";
import { slugify } from "../utils/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "../utils/supabase/upload-image";

export const CreatePost = async (userdata: z.infer<typeof postSchema>) => {
    console.log("Image Parameter",userdata.image)

    const parseData = postSchema.parse(userdata)
    const slug = slugify(parseData.title)

    const imageFile = userdata.image?.get("image")
   console.log("image file",typeof imageFile)

    //const isValid = postSchema.safeParse(userdata);
    //if(!isValid) throw new Error('Malformed Image File')

    if(!(imageFile instanceof File) && imageFile !== null) {
        throw new Error("Malformed Image File")
    }

    //const publicImageUrl = typeof imageFile !== 'string' ? await uploadImage(imageFile as File): null

    const publicImageUrl = imageFile instanceof File ? await uploadImage(imageFile) : null

    const supabase = await createClient();
    const {data:{user}} = await supabase.auth.getUser();

    if(!user) { 
        throw new Error("Not Authorized")
    }
  
    const userId = user.id;

    await supabase.from('posts')
                  .insert([{user_id: userId, slug: slug, ...parseData, image: publicImageUrl}])
                  .throwOnError()

                   revalidatePath("/")
                   redirect(`/${slug}`)
}


/*'use server'
import z from "zod";
import { createClient } from "../utils/supabase/server-client";
import { postSchema } from "./schemas";
import { uploadImage } from "../utils/supabase/upload-image";
import { slugify } from "../utils/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const CreatePost = async (userdata: z.infer<typeof postSchema>) => {
  const parseData = postSchema.parse(userdata);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not Authorized");

  const imageFile = userdata.image?.get("image");
  if (!(imageFile instanceof File) && imageFile !== null) {
    throw new Error("Malformed Image File");
  }

  const publicImageUrl = imageFile instanceof File ? await uploadImage(imageFile) : null;

  let slug = slugify(parseData.title);

  // ensure unique slug
  const { data: existingPost } = await supabase
    .from("posts")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  if (existingPost) {
    slug = `${slug}-${Date.now()}`;
  }

  await supabase
    .from("posts")
    .insert([{ user_id: user.id, slug, ...parseData, image: publicImageUrl }])
    .throwOnError();

  revalidatePath("/");
  redirect(`/${slug}`);
};*/
