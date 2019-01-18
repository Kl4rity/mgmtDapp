export function createOrganisation(organisation) {
    return {type: 'CREATE_ORGANISATION', organisation};
}

export function createOrganisations(organisations){
    return {type: 'CREATE_ORGANISATIONS', organisations}
}