'use client'

import { toast } from "sonner"
import { DeletePost } from "../../../../../actions/delete-post"
import { useMutation } from "@tanstack/react-query"

const DeleteButton = ({postId}:{postId: number}) => {
    const {mutate, error} = useMutation({
        mutationFn: DeletePost,
        onMutate: () => toast("Deleting yout Post"),
        onSettled: () => toast.success("Post deleted")
    })
    return <button className="button-tertiary" onClick={()=> mutate(postId)}>Delete Post</button>
}

export default DeleteButton