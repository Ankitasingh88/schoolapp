import Link from "next/link"

const EditButton = ({slug}: {slug: string})=> {
    return(
    <Link className ="button-secondary" href={`/${slug}/edit`}>Edit post</Link>
    )
}

export default EditButton