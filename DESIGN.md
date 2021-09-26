# Wishlist  
Create and share, no more.

## Proposals:
- Quickstart without login
- Light way design


## Use cases
### Create wishlist
- Create named wishlist from welcome page.
- Get secret link to wishlist and save to safe place.
- Fill details and author name optionally.
- Press out of wishlist form 

### Add wish 
- Open secret link in browser.
- Add wish with title, link and etc and submit.
- Repeat previous step any times.

### Share public link 
- Open secret link in browser.
- Copy public link from browser bar and share with friends.

### Accounting
- Open secret link in browser.
- Mark wish as fulfilled  

### Edit wishlist (header)
- Open secret link in browser.
- Long press on wishlist name/details 
- Press out of wishlist form 

### Edit wish
- Long press on wish card
- Edit any field
- Press out of wish card

### View 
- Open link to list in browser 

### Reserve wish
- Open public link in browser.
- Sort wishes with name, price and etc.
- Add wishes to reservation cart.
- Confirm reservation 
- Export reservations with cancellation code.

### Cancel reservation 
- Open public link in browser
- Enter cancellation code and confirm


## Roles 
* `OWNER`
* `MEMBER` 
* `RANDOM`

## Web app routing 
- `/` **Welcome page**
- `/invent/{invent_id}` **Invent page:** view specific invent with wishlist with member role
- `/secret/{secret_id}` redirect to `/invent/{invent_id}` with owner role 


## Owner
```
--------------------------------------------------------------------------------
                                New year!

                        We'll meet on Friday evening.

                               12.05.2021

--------------------------------------------------------------------------------
                title: ____________________________
                link:  ____________________________
                                                      [Add]
================================================================================
        name                         modified       price            
--------------------------------------------------------------------------------
        Ora Ring 2                 last 1 year      5000 р           fulfill
        [->] http://ora.ring.com/shop  
--------------------------------------------------------------------------------
        Tesla Model S              last 2 year   10 000 000 р        fulfill
        [->] http://tesla.com/shop 
--------------------------------------------------------------------------------
        Iphone 14 Pro Max       last 10 minures    100 000 р         fulfill
        [->] http://apple.com/shop
================================================================================

```

