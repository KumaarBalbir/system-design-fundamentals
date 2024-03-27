#! /bin/bash 

# Clean up previous runs
rm -f host1/map_results/*.txt
rm -f host2/map_results/*.txt
rm -f map_results/*.txt
rm -f reduce_results/*.txt

# Run the map step on both hosts in parallel 
HOST=host1 node map.js &
HOST=host2 node map.js &

# wait for both hosts to finish
wait

# Run the shuffle step.
HOSTS=host1,host2 node shuffle.js

# Run the reduce step
node reduce.js

# view the results
cat reduce_results/results.txt