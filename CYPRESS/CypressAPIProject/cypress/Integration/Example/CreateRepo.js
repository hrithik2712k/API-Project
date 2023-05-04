/// <reference types="Cypress"/>

const token = "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"
const baseurl = "https://api.github.com"

var name = "API-Testing-Cypress"
var description = "This is my first repo"
var owner = "hrithik2712k"
var updated_name = "API-Testing-Cypress3"
var path = "Readme.md"
var message = "File Successfully created"
var shs;
var id;

describe('Github API Testing', () => {
    it('1. Create a Repository for an Authenticated User', () => {
        cy.request({
            method: "POST",
            url: `${baseurl}/user/repos`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            },

            body: {
                "name": name,
                "description": description
            }

        }).then((response) => {
            expect(response.status).to.eql(201);
        })
    });

    it('2. Update a Repository', () => {
        cy.request({
            method: "PATCH",
            url: `${baseurl}/repos/${owner}/${name}`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json",
            },

            body: {
                "name": updated_name
            }
        }).then((response) => {
            expect(response.status).to.eql(200);
            cy.log(JSON.stringify(response.body.name))
        })
    });


    it('4. Get a Repository', () => {
        
        cy.request({
            method: "GET",
            url: `${baseurl}/repos/${owner}/${updated_name}`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eql(200)
            cy.log(JSON.stringify(response))
        })
    });

    it('Create a File Content', () => {
        cy.request({
            method: "PUT",
            url: `${baseurl}/repos/${owner}/${updated_name}/contents/Readme.md`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            }, 
            body: {
                "message": `${message}`,
                "content": "VXBkYXRlZCBIZWxsbyBEdW5peWE="
            }
        }).then((response) => {
            expect(response.status).to.eql(201)
            cy.log(JSON.stringify(response))
            shs = response.body.content.sha
            cy.log(JSON.stringify(shs))
        })
    });

    it('Create a Fork', () => {
        
        cy.request({
            method: "POST",
            url: `${baseurl}/repos/${owner}/${updated_name}/forks`,
             headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            }, 
            body: { 
            "organization":"hrithik27122000",
            "name":"Fork_organii",
            "default_branch_only":true
            }
        }).then((response) => {
            expect(response.status).to.eql(202)
            cy.log(JSON.stringify(response))
        })
    });

    it('List Forks', () => {
        cy.request({
            method: "GET",
            url : `${baseurl}/repos/${owner}/${updated_name}/forks`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eql(200)
            cy.log(JSON.stringify(response))
        })
    });

    it('List Repositories for a User', () => {
        cy.request({
            method: "GET",
            url: `${baseurl}/users/${owner}/repos`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eql(200)
        })
    });

    it('List Repositories for a Language', () => {
        cy.request({
            method: "GET",
            url: `${baseurl}/repos/${owner}/${updated_name}/languages`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eql(200)
            cy.log(JSON.stringify(response))
        })
    });

    it('List Public Repositories', () => {
        cy.request({
            method: "GET",
            url : `${baseurl}/repositories`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eql(200)
            cy.log(JSON.stringify(response))
        })
    });

    it('List Repositories Tags', () => {
        cy.request({
            method: "GET",
            url: `${baseurl}/repos/${owner}/${updated_name}/tags`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eql(200)
            cy.log(JSON.stringify(response))
        })
    });

    it('Create an Autolink Reference for a Repository', () => {
        cy.request({
            method: "POST",
            url: `${baseurl}/repos/${owner}/${updated_name}/autolinks`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            },
            body: {
                "key_prefix": "Gitt-Api",
                "url_template": "https://example.com/TICKET?quer=<num>"
            }
        }).then((response) => {
            expect(response.status).to.eql(201)
            cy.log(JSON.stringify(response))
            id = response.body.id
            cy.log(id)
        })
    });

    it('Get an Autolink Reference for a Repository', () => {
        cy.request({
            method: "GET",
            url: `${baseurl}/repos/${owner}/${updated_name}/autolinks/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            },

        }).then((response) => {
                expect(response.status).to.eql(200)
        })
    });

    it('Get a Repository', () => {
        cy.request({
            method: "GET",
            url: `${baseurl}/repos/${owner}/${updated_name}`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eql(200)
            cy.log(JSON.stringify(response))
        })
    });

    it('Get All Repository Topics', () => {
        cy.request({
            method: "GET",
            url: `${baseurl}/repos/${owner}/${updated_name}/topics`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eql(200)
            cy.log(JSON.stringify(response))
        })
    });

    it('Replace all Topics in Repository', () => {
        cy.request({
            method: "PUT",
            url: `${baseurl}/repos/${owner}/${updated_name}/topics`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            },

            body: {
                "names": [
                    "javascript",
                    "html"
                  ]
            }
        }).then((response) => {
            expect(response.status).to.eql(200)
            cy.log(JSON.stringify(response))
        })
    });

    it('Delete a Fork', () => {
        cy.request({
            method: "DELETE",
            url: `${baseurl}/repos/hrithik27122000/Fork_organii`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            },

        }).then((res) => {
            expect(res.status).to.eql(204)
        })
    });

    it('Delete from an Autolink Reference for a Repository', () => {
        cy.request({
            method: "DELETE",
            url: `${baseurl}/repos/${owner}/${updated_name}/autolinks/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eql(204)
        })
    });

    it('Delete a File', () => {
        cy.request({
            method: "DELETE",
            url: `${baseurl}/repos/${owner}/${updated_name}/contents/Readme.md`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            },

            body: {
                "message": "Deleted",
                "sha": `${shs}`
            }
        }).then((response) => {
            expect(response.status).to.eql(200)
        })
    });

    it('3. Delete a Repository', () => {
        cy.request({
            method: "DELETE",
            url: `${baseurl}/repos/${owner}/${updated_name}`,
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
            }
        }).then((response) =>{
            expect(response.status).to.eql(204)
            cy.log(JSON.stringify(response.body.name))
        })
    });
    

});