export const getProductsList = async () => {
    const res = await fetch("https://testapi-livid.vercel.app/products")
    return await res.json()
}

export const deleteProducts = async (id: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id": id
    });

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
    };

   const response = await fetch("https://testapi-livid.vercel.app/products/" + id, requestOptions);
    return await response.json();
}

export const createProducts = async (raw: string) =>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        //redirect: "follow"
    };

    const response = await fetch("https://testapi-livid.vercel.app/products", requestOptions);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

export const getProductsById = async (id: string) =>{
    const requestOptions = {
        method: "GET",
    };

   const response = await fetch("https://testapi-livid.vercel.app/products/" + id, requestOptions);
    return await response.json();
}

export const putProducts = async (id:string, raw: string) =>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        //redirect: "follow"
    };

    return fetch("https://testapi-livid.vercel.app/products/"+ id , requestOptions)
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
}

export const sentFlexToLine = async (data: { 
    userId: string, 
    productId: string
  }) =>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer fTLQpURatpFHiI500kevYWlI9WhuuTmzRiuA93JjzraCWZleWQsrAqpJ1zGeLznCbB0TW75jSej4cLanrGUa+K3AsxaWCtLd/NqUWPKUWsmu7CQ5Y5vCAjREi44jUZtHASeELCW6eNvyKRCDfT8DrwdB04t89/1O/w1cDnyilFU=");


    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data), // ส่งข้อมูลในรูปแบบ JSON
        redirect: "follow" as RequestRedirect
    };

    return fetch("https://testapi-livid.vercel.app/send-message/", requestOptions)
        .then((response) => response.text())
} 