const memberRole = {
    name : 'member',
    permissions : {
        vote : {
            create : false,
            close : false,
            remove : false,
            cast : true,
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

module.exports = memberRole;