#!/bin/bash
node sdk.js
success=$?
echo $success
if [ $success == 0 ]
then
   echo "PDF generated"
else
   echo "PDF couldnt be generated"
fi