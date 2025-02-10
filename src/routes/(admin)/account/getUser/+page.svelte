<script>
  let { data } = $props()
  let { profile } = data

  //console.log(data)

  $effect(() => {
    //console.log(profile)
  })
</script>

<div>
  <h1>User</h1>
  <p>{data}</p>
</div>
