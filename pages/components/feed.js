import React from 'react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';

const Feed = ({ posts, feelings }) => {
    posts = Object.keys(posts).map(key => posts[key]);

    const [filteredPosts, setFilteredPosts] = React.useState(posts);

    var feelingsArray = Object.keys(feelings).map(key => {
        var final = {
            label: feelings[key].title,
            value: feelings[key].uid,
        };

        return final;
    });

    const [pickerFeelings, setPickerFeelings] = React.useState(feelingsArray);
    const [selectedFeelings, setSelectedFeelings] = React.useState(new Array());

    const handleSelectedItemsChange = (changes) => {
        if (changes) {
            setSelectedFeelings(changes.selectedItems);

            if (!changes.selectedItems.length) {
                // user selected no feelings, go back to normal filter

                // WARINING: when I add a filter for types, it should be the type filtered ones here

                setFilteredPosts(posts);

                return;
            }

            var feelingsUids = changes.selectedItems.map(a => a.value);

            var newPosts = new Array();

            for (const post of posts) {
                var filteredFeelings = post.feelingsUids.filter(f => feelingsUids.includes(f));

                if (!filteredFeelings.length) {
                    // no matches, skip this post

                    continue;
                }

                // add post

                newPosts.push(post);
            }

            setFilteredPosts(newPosts);
        };
    };

    return (
        <div>
            <CUIAutoComplete
                label="Filtre por sentimentos"
                placeholder="Selecione um ou mais sentimentos"
                items={pickerFeelings}
                selectedItems={selectedFeelings}
                hideToggleButton={true}
                onSelectedItemsChange={(changes) =>
                    handleSelectedItemsChange(changes)
                }
                disableCreateItem={true}
            />
            {filteredPosts.map(post => (
                <div key={post.id} style={{ margin: '30px' }}>
                    <div>{`título: ${post.title}`}</div>
                    <div>{`tipo: ${post.type}`}</div>
                    <div>{"sentimentos: " + post.feelingsUids.map(feeling => {
                        var feelingsArray = Object.keys(feelings).map(key => feelings[key]);

                        var title = feelingsArray.find(f => {
                            if (f.uid !== feeling) {
                                return;
                            }

                            return f;
                        }).title;

                        return title;
                    })}</div>
                </div>
            ))}
        </div>
    );
}

export default Feed;