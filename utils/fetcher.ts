const fetcher = (route: string) => fetch(`api/${route}`).then(res => res.json())
