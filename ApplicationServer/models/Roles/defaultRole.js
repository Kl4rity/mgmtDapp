const defaultRole = {
    name : 'default',
    permissions : {
        vote : {
            create : false,
            close : false,
            remove : false,
            cast : false,
            changeEndDate : false
        }
        , organisation : {
            create : true,
            addMember : false,
            removeMember : false,
            close : false
        }
        , member : {
            changeRole: false   
        }
    }
}

module.exports = defaultRole;